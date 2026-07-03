package JourneySync.demo.repository;

import JourneySync.demo.entity.ExpensePayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository

public interface ExpensePayerRepository extends JpaRepository<ExpensePayer, UUID> {
    List<ExpensePayer> findByParticipantId(UUID participantId);
}
