package JourneySync.demo.dto;

import lombok.Data;

@Data

public class DebtSettlementDTO {

    private String from;
    private String to;
    private Double amount;

    public DebtSettlementDTO(String from, String to, Double amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }


}
