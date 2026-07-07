package JourneySync.demo.dto;

import JourneySync.demo.entity.Role;

import java.util.UUID;

public record ParticipantResponse(
        UUID id,
        UserResponse user,
        Role role
) {
}
