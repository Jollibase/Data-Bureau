import json

from channels.generic.websocket import AsyncWebsocketConsumer


class VerifyUserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]

        await self.channel_layer.group_add(self.user_id, self.channel_name)

        await self.accept()

    async def disconnect(self, _):
        await self.channel_layer.group_discar(self.task_id, self.channel_name)

    async def verify_user(self, event):
        data = event["data"]

        await self.send(text_data=json.dumps(data))
