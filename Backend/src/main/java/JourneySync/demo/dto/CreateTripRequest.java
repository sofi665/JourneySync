package JourneySync.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

public record CreateTripRequest(
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate
) {
}
