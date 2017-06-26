# Firebase Chat App with Ionic (v3) & AngularFire2 (4.0.0)

# Content
* Registration page.
* Login page
* Chat Favourites list page
* Chat window page

# How to use?
* After cloning this repository, run "npm install" or "yarn" command to download and install node_modules.
* Then move to app.module.ts and connect your database with this app,
(for more info https://firebase.google.com/docs/web/setup)
            
           apiKey: "<API_KEY>",
           authDomain: "<PROJECT_ID>.firebaseapp.com",
           databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
           storageBucket: "<BUCKET>.appspot.com",
           messagingSenderId: "<SENDER_ID>"

* That's all about setup, now you can run your app.
* To run in browser, run "ionic serve" cmd.
* To run in Android, run "ionic platform add android" & "ionic run android" cmd.
* To run in iOS, run "ionic platform add ios" & "ionic run ios" cmd.

