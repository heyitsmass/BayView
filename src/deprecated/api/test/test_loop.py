from ..lib.loop import Heartbeat


class TestHeartbeat:
    def test_start_stop(self):
        hb = Heartbeat.test_client()

        hb.start()

        assert hb.is_running() is True, "Heartbeat not running."
        assert hb._thread.is_alive() is True, "Heartbeat thread not alive."

        hb.stop()

        assert hb.is_running() is False, "Heartbeat still running."

    def test_set_interval(self):
        hb = Heartbeat.test_client()
        hb.set_interval(5)
        hb.stop()
        assert hb.get_interval() == 5, "Heartbeat interval not set."

    def test_set_name(self):
        hb = Heartbeat.test_client()
        hb.name = "Test2"
        hb.stop()

        assert hb.name == "Test2", "Heartbeat name not set."

    def test__start(self):
        hb = Heartbeat.test_client()
        hb.start()

        assert hb._thread.is_alive() is True, "Heartbeat thread not alive."
        assert hb._loop.is_running() is True, "Heartbeat loop not running."

        hb.stop()

        assert hb._thread.is_alive() is False, "Heartbeat thread still alive."
