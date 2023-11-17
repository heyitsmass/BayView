from ..lib.errors import ActionLookupError


class TestErrors:
    def test_ActionLookupError(self):
        try:
            raise ActionLookupError("test")
        except ActionLookupError as e:
            assert e.args == ("Unknown action. test",)
