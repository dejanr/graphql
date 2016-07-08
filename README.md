# graphql api

Examples:

Appointments queries
```
http://localhost:3000/?query=%7B%0A%20%20appointment(id%3A%2225f139cb-3d51-4128-b39c-d468730442ac%22)%20%7B%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%20%20duration%0A%20%20%7D%0A%20%20%0A%20%20appointments(limit%3A%201)%20%7B%0A%20%20%20%20id%0A%20%20%20%20...durationInfo%0A%20%20%20%20%0A%20%20%20%20resources%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20services%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%09%09%09name%0A%20%20%09%09%09category%20%7B%0A%20%20%20%20%09%09%09name%0A%20%20%09%09%09%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20steps%20%7B%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20duration%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20durationInfo%20on%20Appointment%20%7B%0A%20%20start%0A%20%20end%0A%20%20duration%0A%7D
```
