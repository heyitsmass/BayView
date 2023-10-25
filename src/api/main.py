from lib.app import driver
from lib.loop import EventLoop

if __name__ == "__main__":
    loop = EventLoop(driver)

    loop.run()
