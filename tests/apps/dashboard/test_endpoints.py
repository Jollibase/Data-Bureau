from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from tests.factories.dashboard import DashboardFactory, Dashboard


class DeleteDashboardTestcase(APITestCase):
    @classmethod
    def setUpClass(cls):
        cls.dashboard_one = DashboardFactory()
        cls.dashboard_two = DashboardFactory()
        cls.url = reverse("dashboard_delete")

    def test_ok(self):
        response = self.client.post(self.url, data=[self.dashboard_one.id])

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertQuerysetEqual(Dashboard.objects.all(), self.dashboard_two)
