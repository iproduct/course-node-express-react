package demos.springdata.restdemo.web;

import demos.springdata.restdemo.exception.EntityNotFoundException;
import demos.springdata.restdemo.exception.InvalidEntityException;
import demos.springdata.restdemo.model.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice("demos.springdata.restdemo.web")
@Slf4j
public class ExceptionHandlerControllerAdvice {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handle(EntityNotFoundException ex){
        log.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(ex.getClass().getSimpleName(), ex.getMessage()));
    }

    @ExceptionHandler({InvalidEntityException.class, ConstraintViolationException.class, HttpMessageConversionException.class})
    public ResponseEntity<ErrorResponse> handle(Exception ex){
        log.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(ex.getClass().getSimpleName(), ex.getMessage()));
    }

    @ExceptionHandler
    public ResponseEntity<String> handle(AccessDeniedException ex){
        log.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }

}
