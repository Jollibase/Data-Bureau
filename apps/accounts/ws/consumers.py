import json

from channels.generic.websocket import AsyncWebsocketConsumer


class VerifyUserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user_id = self.scope["url_route"]["kwargs"]["user_id"]
        print(self.scope["url_route"]["kwargs"])
        self.user_room = f"channel-{user_id}"
        print(self.user_room)

        await self.channel_layer.group_add(self.user_room, self.channel_name)

        await self.accept()

    async def disconnect(self, _):
        await self.channel_layer.group_discard(self.user_room, self.channel_name)

    async def receive(self, data, **kwargs):
        """Receive messages over socket."""
        resp = data
        await self.send(json.dumps(resp, default=str))

    async def verify_user(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps(data))
