import asyncio
from threading import Thread
from typing import Callable
import logging


class Heartbeat:
    def __init__(self, fn: Callable, *args, **kwargs):
        self.function = fn
        self.args = args
        self.kwargs = kwargs

        self.__loop = asyncio.new_event_loop()
        self.__task = self.__loop.create_task(self.__run())
        self.__thread = Thread(target=self.__start, args=(self.__loop,))
        self.__interval = 0
        self.__running = False
        logging.info("Heartbeat initialized.")

    def __start(self, loop: asyncio.AbstractEventLoop):
        asyncio.set_event_loop(loop)
        loop.run_forever()

    async def __run(self):
        while self.__running:
            logging.info("Heartbeat")
            self.function(*self.args, **self.kwargs)
            await asyncio.sleep(self.__interval)

    def run(self, interval: int):
        self.__interval = interval
        self.__running = True
        logging.info(f"Starting heartbeat - interval: {self.__interval}")
        self.__thread.start()
        # asyncio.gather(self.__run())

    def isRunning(self):
        return self.__running

    def stop(self):
        self.__running = False
        self.__task.result()
        self.__thread.join()
        self.__loop.stop()
        logging.info("Heartbeat stopped.")


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[logging.FileHandler("debug.log"), logging.StreamHandler()],
    )

    hb = Heartbeat(lambda: print("Hello World"))

    hb.run(5)

    print("started.")

    hb.stop() 
