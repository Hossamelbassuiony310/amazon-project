# Use official Nginx image
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your static files
COPY html /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
