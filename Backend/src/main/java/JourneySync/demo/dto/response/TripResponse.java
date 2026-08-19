package JourneySync.demo.dto.response;

import java.time.LocalDate;
import java.util.UUID;

public record TripResponse(
        UUID id,
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate
) {}
