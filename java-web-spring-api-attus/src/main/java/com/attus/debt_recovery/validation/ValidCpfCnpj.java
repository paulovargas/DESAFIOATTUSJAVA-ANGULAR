package com.attus.debt_recovery.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidCpfCnpjValidator.class)
public @interface ValidCpfCnpj {

    String message() default "CPF/CNPJ invalido.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
