package weiz.code.OperacionDeTransporte;

import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OperacionDeTransporteApplication implements CommandLineRunner {


    public static void main(String[] args) {
        SpringApplication.run(OperacionDeTransporteApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        //var v = viajeRepository.findByManifiestoId(5L);
        //System.out.println(v.toString());
    }
}
