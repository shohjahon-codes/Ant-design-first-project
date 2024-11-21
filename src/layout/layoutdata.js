import {
    NotificationOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  
  export const navData = [
    {
      id: 1,
      label: "Home",
      icon: NotificationOutlined,
      path: "/",
    },
    {
      id: 2,
      label: "User",
      icon: UserOutlined,
      path: "/profile",
      children: [
        {
          id: 3,
          label: "Address",
          path: "/profile/address",
        },
        {
          id: 4,
          label: "Order",
          path: "/profile/order",
        },
      ],
    },
  ];
  