package demos.springdata.restdemo.gson;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import demos.springdata.restdemo.model.Post;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

public class PostGsonSerializer implements JsonSerializer<Post> {
    private SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

    @Override
    public JsonElement serialize(Post post, Type type,
                                 JsonSerializationContext jsonSerializationContext) {

        JsonObject actorJsonObj = new JsonObject();

        actorJsonObj.addProperty("Id", post.getId());
        actorJsonObj.addProperty("Title", post.getTitle().toUpperCase());

        actorJsonObj.addProperty("Published Date",
                post.getCreated() != null ?
                        sdf.format(post.getCreated()) : null);

        actorJsonObj.addProperty("Author", post.getAuthor()  != null ?
                post.getAuthor().getFirstName() + " " + post.getAuthor().getLastName() : null);

        actorJsonObj.addProperty("Content", post.getContent());

        return actorJsonObj;
    }

}
