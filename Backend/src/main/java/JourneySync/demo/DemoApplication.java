package JourneySync.demo;

import JourneySync.demo.entity.*;
import JourneySync.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

//	@Bean
//    CommandLineRunner testData(UserRepository userRepo,
//                               TripRepository tripRepo,
//                               ParticipantRepository participantRepo,
//                               ExpenseRepository expenseRepo,
//                               ExpensePayerRepository expensePayerRepo,
//                               ExpenseShareRepository expenseShareRepo) {
//
//		return args -> {
//
//			User user = User.builder()
//					.name("Sofia")
//					.email("sofia@test.com")
//					.password("1234")
//					.build();
//
//			userRepo.save(user);
//
//			Trip trip = new Trip();
//			trip.setTitle("Viaje a Brasil");
//			tripRepo.save(trip);
//
//			Participant participant = new Participant();
//			participant.setUser(user);
//			participant.setTrip(trip);
//			participant.setRole(Role.ADMIN);
//			participantRepo.save(participant);
//
//			Expense expense = new Expense();
//			expense.setTitle("Cena");
//			expense.setAmount(100.0);
//			expense.setCurrency("USD");
//			expense.setDate(LocalDate.now());
//			expense.setTrip(trip);
//			expense.setCreatedBy(participant);
//
//			expense = expenseRepo.save(expense);
//
//			ExpensePayer payer = new ExpensePayer();
//			payer.setExpense(expense);
//			payer.setParticipant(participant);
//			payer.setAmount(100.0);
//
//			ExpenseShare share = new ExpenseShare();
//			share.setExpense(expense);
//			share.setParticipant(participant);
//			share.setAmount(100.0);
//
//			expensePayerRepo.save(payer);
//			expenseShareRepo.save(share);
//		};
//	}
}
