package JourneySync.demo.dto;

import java.util.List;
import java.util.UUID;

public record CreateExpenseRequest(
        String title,
        Double amount,
        String currency,
        UUID payerParticipantId,
        List<UUID> participantIds
) {
}
