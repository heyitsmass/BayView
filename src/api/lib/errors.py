class ActionLookupError(Exception):
    def __init__(self, name: str):
        self.args = {f"Unknown action. {name}"}
