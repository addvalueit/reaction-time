package recupero;

import java.io.InputStream;

/**
 * @author Add Value S.p.A. by nicholas.mantovani
 * @version apr  12, 2024
 */
public class Main {

    public static void main(String[] args) {

        Recupero recupero = new Recupero();
        try {
            recupero.handleRequest(System.in, System.out, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
