package demos.springdata.restdemo.events;

import demos.springdata.restdemo.model.User;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
public class UserCreationEvent {
        private final User user;
}
