import asyncio
import os
from asyncio import Future
from threading import Thread
from typing import Coroutine

from dotenv import load_dotenv

from .app import WebDriver
from .routes import app

load_dotenv()

class EventLoop:
    """
    A class that runs an event loop in a separate thread.
    """

    def __init__(self, driver: WebDriver):
        """
        A class representing an asyncio event loop that runs in the background.

        :param driver: An instance of the WebDriver class.
        """
        self._running = False

        self._loop = asyncio.new_event_loop()  # create an event loop
        self._thread = Thread(
            target=self.__start_background_loop, args=(self._loop,), daemon=True
        )

        self._driver = driver
        self.tasks: list[Future] = []

    def isRunning(self) -> bool:
        """
        Returns:
            True if the event loop is running, False otherwise.
        """
        return self._running

    def run(self):
        """
        Runs the event loop.
        """
        self._running = True
        self._thread.start()

        self.create_task(self._driver.heartbeat.run())

        self._primary = self.create_task(
            app.run(
                port=os.environ.get("PORT", 3001),
            )
        )

        return self._primary.result()

    def stop(self):
        """
        Stops the event loop.
        """
        self._running = False
        self._driver.quit()
        self._loop.stop()
        self._thread.join()

    def __start_background_loop(self, loop: asyncio.AbstractEventLoop):
        """
        Starts the event loop in a separate thread.
        """
        asyncio.set_event_loop(loop)
        loop.run_forever()

    def create_task(self, task: Coroutine):
        """
        Creates a task in the event loop.
        """
        task = asyncio.run_coroutine_threadsafe(task, self._loop)
        self.tasks.append(task)
        return task


if __name__ == "__main__":
    # tests

    print("Tests passed!")
