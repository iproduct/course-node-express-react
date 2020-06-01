package demos.springdata.restdemo.events;

import demos.springdata.restdemo.model.Post;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
public class PostCreationEvent {
        private final Post post;
}
