# 🌐 Social Media App 

## Features

- **Creating Posts**: Creating your own posts with text and tags.
- **Auto-Save**: Your tasks are saved in database.
- **Reacting To Posts**: Liking and commenting other users posts.
- **Following Users**: You can follow and unfollow users.
- **Authentication**: Creating your own profile with google account.
- **Search**: Search other users profiles or posts by text or tag.
  
## Built With

- `Tailwind`
- `NextJs`
- `Javascript`
- `NextAuth v4`
- `MongoDB`

## Future Improvements

- **Responsive**: Mobile responsive design in the near future.
- **Profile Customization**: Customizing your own profile with banners and changing the username.
- **New Design**: Overall new design for the app.
- **Posting Images**: Posting images as the post (like in instagram).
- **New Reactions**: Reacting to post with new emojis and reactions (heart, smiley ect...).

## Video Preview

https://github.com/KowyXYZ/social-media-app/assets/115591834/35f7cdb4-2000-40bf-94e6-1260cb291a01

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/KowyXYZ/social-media-app
cd social-media-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on these corresponding websites from [Google Cloud Console](https://console.cloud.google.com/welcome?rapt=AEjHL4MBaLLneW6OfAHf_zgms1eWZFw1wdy0_KIC4uh1nEqh2m4ojOvrXNlzJ4h7CZTkpiWgcsoHbUvS-FMdCP7WIkaVlPAeU7cnVR6Y0wJHeLMOtU6KAzA&project=promptopia-385410), [Cryptpool](https://www.cryptool.org/en/cto/openssl) (for random Auth Secret), and [MongoDB](https://www.mongodb.com/). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


