Deployed on Heroku: https://jarvis-stackathon.herokuapp.com/

### Features
Jarvis is a personalized dashboard that uses AWS Facial Recognition for Authentication.
Once the user is logged in, he/she can see the following widgets on the dashboard: weather, real time stock prices, news, trending movies and TV shows.
Please note: real time stock prices feature is temporarily unavilable due to an expired license key.
The user can also update their profile and their preferences (example: stocks being subscriped to)


### Functionality and Design
1. To access the personalized dashboard, the user first needs to register. 
   During the registration process, the user's picture is taken using webcam. This is used to authenticate the user when he/she logins using `AWS Facial Recognition`. On receiving the request from the client, the server:
    1. Checks the AWS Facial Collection to verify that user doesn't already exist. If so, it sends error to the client.
    2. If not already present, the captured image is uploaded to AWS S3 bucket and Face Collection. The resulting FaceId is stored in the database to verify the user on subsequent logins.
    3. A personalized greeting is also created using `AWS Polly` service and uploaded to S3. This is played when the user logs in.
2. When the user logs in:
    1. The image captured by the webcam is sent to AWS Facial Recognition service.
    2. If case of a match, the matched Face Id is used to validate the user and play personalized greeting.
    3. The user can access the dashboard.
3. Currently, the following widgets are supported:
    1. Weather: 
        1. Navigator Geolocation is used to obtain the user's latitude and longitude and the request is sent to the server.
        2. Server uses `Open Weather Map API` and sends the response back to the client.
    2. Real time stock prices:
        1. Client subscribes to the tickers for real-time updates using Web Sockets.
        2. Server keeps track of the tickers each connected client has subscribed to and sends them the relevant updates.
        3. Server uses `Intrino API` to obtain the stock prices. The time internal for the updates can be configured. 
           Please note that this feature is temporarily unavailable due to an expired trial license key.
    3. News:
        1. Client subscribes to the Server for News.
        2. Server requests `News API` and sends the updates to the client (Web Sockets). The time interval for updates can be configured
    4. Trending Movies/ TV shows:
        1. Client requests the Server for Trending Movies/ TV shows.
        2. Server requests `The Movie DB API` and sends the updates to the client
      
### Future Improvements
  1. Add tests. This project is Hackathon project and was done in 4-5 days, which did not provide much time to add tests.
  2. Provide ability to the users to subscribe to certain news topics (such as top headlines, finance, etc)
  3. Support new widgets and allow users to customize their dashboard by selecting the widgets they are interested in
  
        

