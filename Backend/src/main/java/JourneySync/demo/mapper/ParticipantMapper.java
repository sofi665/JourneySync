package JourneySync.demo.mapper;

import JourneySync.demo.dto.ParticipantResponse;
import JourneySync.demo.dto.UserResponse;
import JourneySync.demo.entity.Participant;
import org.springframework.stereotype.Component;

@Component
public class ParticipantMapper {

    public ParticipantResponse toResponse(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                toUserResponse(participant),
                participant.getRole()
        );
    }

    private UserResponse toUserResponse(Participant participant) {
        return new UserResponse(
                participant.getUser().getId(),
                participant.getUser().getName(),
                participant.getUser().getEmail()
        );
    }
}
