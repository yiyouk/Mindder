FROM java:8
VOLUME /tmp
EXPOSE 9999
ARG JAR_FILE=mindderStart-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata