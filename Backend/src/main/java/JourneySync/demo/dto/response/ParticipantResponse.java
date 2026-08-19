package JourneySync.demo.dto.response;

import JourneySync.demo.entity.Role;

import java.util.UUID;

public record ParticipantResponse(
        UUID id,
        UserResponse user,
        Role role
) {
}
