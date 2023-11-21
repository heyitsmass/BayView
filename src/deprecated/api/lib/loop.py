import asyncio
import logging
import time
from threading import Thread
from typing import Callable


class Heartbeat:
    def __init__(
        self, fn: Callable, interval: int, name: str | None = None, *args, **kwargs
    ):
        self._running = False
        self._loop = asyncio.new_event_loop()
        self._task = self._loop.create_task(self._run())
        self._thread = Thread(target=self._start, args=(self._loop,))
        self.function = fn
        self.args = args
        self.kwargs = kwargs
        self._interval = interval
        self.name = name

    async def _run(self, polling_interval=1, permanent=False):
        st = 0
        while self._running:
            try:
                if not permanent:
                    if time.time() - st > self._interval:
                        st = time.time()
                        self.function(*self.args, **self.kwargs)
                    await asyncio.sleep(polling_interval)
                else:
                    self.function(*self.args, **self.kwargs)
                    await asyncio.sleep(self._interval)
            except asyncio.CancelledError:
                logging.info("Heartbeat cancelled.")
                break

    def _start(self, loop: asyncio.AbstractEventLoop):
        asyncio.set_event_loop(loop)
        loop.run_forever()

    def start(self):
        self._running = True
        self._thread.start()

    def stop(self):
        self._running = False
        logging.info("Stopping heartbeat.")
        self._task.cancel()
        self._loop.stop()

        if self._thread.is_alive():
            self._thread.join()
            logging.info("Heartbeat stopped.")

    def is_running(self):
        return self._running

    def set_interval(self, interval: int):
        self._interval = interval

    def get_interval(self):
        return self._interval

    def test_client():
        return Heartbeat(lambda: print("Hello World"), interval=10, name="Test")
