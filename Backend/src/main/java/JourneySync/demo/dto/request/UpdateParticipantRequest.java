package JourneySync.demo.dto.request;

import JourneySync.demo.entity.Role;
import jakarta.validation.constraints.NotNull;

public record UpdateParticipantRequest(
        @NotNull Role role
) {
}
