package JourneySync.demo.dto.request;

import JourneySync.demo.entity.Role;

import java.util.UUID;

public record CreateParticipantRequest(
        UUID userId,
        Role role
) {

}
