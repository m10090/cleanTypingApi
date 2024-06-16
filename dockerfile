FROM oven/bun:debian


# Copy the current directory contents into the container at /app
COPY . /app

WORKDIR /app 

SHELL [ "bash" , "-c"]

# Install dependencies

RUN ["bun", "install"]


EXPOSE $PORT 

CMD ["bun" ,"run", "build"]

