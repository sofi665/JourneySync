package JourneySync.demo.dto;

import lombok.Data;
import lombok.Setter;

import java.util.UUID;
@Data
@Setter

public class ParticipantBalanceDTO {

    private UUID participantId;
    private String name;
    private Double totalPaid;
    private Double totalOwed;
    private Double balance;

    public ParticipantBalanceDTO(UUID participantId, String name,
                                 Double totalPaid, Double totalOwed) {
        this.participantId = participantId;
        this.name = name;
        this.totalPaid = totalPaid;
        this.totalOwed = totalOwed;
        this.balance = totalPaid - totalOwed;
    }

}
