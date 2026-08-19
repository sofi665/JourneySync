package JourneySync.demo.dto.request;

import java.time.LocalDate;

public record CreateTripRequest(
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate
) {
}
