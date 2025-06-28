# Instagram-like Backend :

## Deployment on Vercel

### Prerequisites
1. Create a [Vercel Account](https://vercel.com/signup)
2. Connect your GitHub account to Vercel
3. Fork this repository to your GitHub account

### Deploy Steps
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Select your forked repository
4. Configure Environment Variables:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_SECRET_KEY`
5. Click "Deploy"



# API Documentation: 

📚 [Complete API Documentation](https://chatgpt.com/canvas/shared/67bc6d1f6cb081919a8b3a79270c2686)

## Base URL
 Your Deployed URL:

## Authentication
Most endpoints require authentication using a Bearer token in the headers:
```
Authorization: Bearer <token>
```

## 1. Authentication APIs

### Sign Up
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Body**:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
- **Response**: User object with token

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "string",
    "password": "string"
}
```
- **Response**: User object with token

### Logout
- **URL**: `/auth/logout`
- **Method**: `DELETE`
- **Headers**: `Authorization`
- **Response**: Success message

### Get Zuckerberg Message
- **URL**: `/auth/zuku`
- **Method**: `GET`
- **Headers**: `Authorization`
- **Response**: Random Zuckerberg message

## 2. Post APIs

### Upload File
- **URL**: `/post/upload`
- **Method**: `POST`
- **Headers**: `Authorization`
- **Body**: `form-data`
  - `file`: Image file (png, jpg, jpeg)
- **Response**: File URL

### Create Post
- **URL**: `/post/create`
- **Method**: `POST`
- **Headers**: `Authorization`
- **Body**:
```json
{
    "text": "string (optional)",
    "image": "string (optional)"
}
```
- **Note**: At least one of text or image is required

### Update Post
- **URL**: `/post/update/:id`
- **Method**: `PUT`
- **Headers**: `Authorization`
- **Params**: `id` (post ID)
- **Body**:
```json
{
    "text": "string (optional)",
    "image": "string (optional)"
}
```

### Delete Post
- **URL**: `/post/delete/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization`
- **Params**: `id` (post ID)

### View Post
- **URL**: `/post/view/:id`
- **Method**: `GET`
- **Headers**: `Authorization`
- **Params**: `id` (post ID)

### Get My Posts
- **URL**: `/post/my-posts`
- **Method**: `GET`
- **Headers**: `Authorization`

### Get All Posts
- **URL**: `/post/all-posts`
- **Method**: `GET`
- **Headers**: `Authorization`

### Get Feed
- **URL**: `/post/feed`
- **Method**: `GET`
- **Headers**: `Authorization`

### Get Post Stats
- **URL**: `/post/stats/:postId`
- **Method**: `GET`
- **Headers**: `Authorization`
- **Params**: `postId`

### Like Post
- **URL**: `/post/like/:id`
- **Method**: `POST`
- **Headers**: `Authorization`
- **Params**: `id` (post ID)

### Unlike Post
- **URL**: `/post/unlike/:id`
- **Method**: `POST`
- **Headers**: `Authorization`
- **Params**: `id` (post ID)

## 3. Comment APIs

### Create Comment
- **URL**: `/comment/create/:postId`
- **Method**: `POST`
- **Headers**: `Authorization`
- **Params**: `postId`
- **Body**:
```json
{
    "text": "string"
}
```

### Get Comments
- **URL**: `/comment/:postId`
- **Method**: `GET`
- **Headers**: `Authorization`
- **Params**: `postId`

### Delete Comment
- **URL**: `/comment/:commentId`
- **Method**: `DELETE`
- **Headers**: `Authorization`
- **Params**: `commentId`

## 4. User APIs

### Get User Profile
- **URL**: `/user/profile/:userId`
- **Method**: `GET`
- **Headers**: `Authorization`
- **Params**: `userId`

### Update Profile
- **URL**: `/user/profile`
- **Method**: `PUT`
- **Headers**: `Authorization`
- **Body**:
```json
{
    "name": "string"
}
```

## Response Format
All APIs follow a standard response format:
```json
{
    "success": boolean,
    "message": "string",
    "data": object | null
}
```

## Error Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

