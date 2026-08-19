package JourneySync.demo.service;


import JourneySync.demo.dto.request.LoginRequest;
import JourneySync.demo.dto.request.RegisterRequest;
import JourneySync.demo.dto.response.LoginResponse;
import JourneySync.demo.dto.response.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}
