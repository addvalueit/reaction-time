package recupero;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.Driver;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Add Value S.p.A. by nicholas.mantovani
 * @version apr  11, 2024
 */
public class Recupero implements RequestStreamHandler {
    private ObjectMapper objectMapper = new ObjectMapper();

    private static final String GET_REACTION_TIME = "SELECT reaction_times.id, reaction_times.time, reaction_times.tms_insert, reaction_times.user_id, users.name FROM reaction_times JOIN users ON reaction_times.user_id = users.id WHERE (reaction_times.user_id, reaction_times.time) IN (SELECT user_id, MIN(time) FROM reaction_times GROUP BY user_id) ORDER BY reaction_times.time ASC;";

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {

        System.out.println("Lambda started");
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        List<ReactionTime> reactionTimes = new ArrayList<>();

        try {
            connection = getConnection();
            preparedStatement = connection.prepareStatement(GET_REACTION_TIME);

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                ReactionTime reactionTime = new ReactionTime();
                reactionTime.setId(resultSet.getLong("id"));
                reactionTime.setTime(resultSet.getLong("time"));
                reactionTime.setTmsInsert(resultSet.getDate("tms_insert"));
                reactionTime.setUserId(resultSet.getLong("user_id"));
                reactionTime.setName(resultSet.getString("name"));
                reactionTimes.add(reactionTime);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close(connection, preparedStatement, resultSet);
        }

        System.out.println("Lambda ended, sending response");

        objectMapper.writeValue(outputStream, reactionTimes);
    }

    private Connection getConnection() throws SQLException {

        String databaseJdbcUrl = System.getenv("DATABASE_JDBC_URL");

        DriverManager.registerDriver(new Driver());

        return DriverManager.getConnection(databaseJdbcUrl);
    }

    public static void close(Connection connection,
                             PreparedStatement prepareStatement, ResultSet resultSet) {
        if (prepareStatement != null)
            try {
                prepareStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        if (connection != null)
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        if (resultSet != null)
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
    }
}

