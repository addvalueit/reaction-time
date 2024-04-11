package recupero;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;

/**
 * @author Add Value S.p.A. by nicholas.mantovani
 * @version apr  11, 2024
 */

public class ReactionTime {

    @JsonProperty
    private long id;

    @JsonProperty
    private long time;

    @JsonProperty
    private long userId;

    @JsonProperty
    private String name;

    @JsonProperty
    private Date tmsInsert;


    /**
     * The wrapper method of the {@link #id} property.
     *
     * @return the value of the property
     */
    public long getId() {
        return id;
    }

    /**
     * Stores the value of the {@link #id} property internally.
     *
     * @param id the property to be stored
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * The wrapper method of the {@link #time} property.
     *
     * @return the value of the property
     */
    public long getTime() {
        return time;
    }

    /**
     * Stores the value of the {@link #time} property internally.
     *
     * @param time the property to be stored
     */
    public void setTime(long time) {
        this.time = time;
    }

    /**
     * The wrapper method of the {@link #userId} property.
     *
     * @return the value of the property
     */
    public long getUserId() {
        return userId;
    }

    /**
     * Stores the value of the {@link #userId} property internally.
     *
     * @param userId the property to be stored
     */
    public void setUserId(long userId) {
        this.userId = userId;
    }

    /**
     * The wrapper method of the {@link #name} property.
     *
     * @return the value of the property
     */
    public String getName() {
        return name;
    }

    /**
     * Stores the value of the {@link #name} property internally.
     *
     * @param name the property to be stored
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * The wrapper method of the {@link #tmsInsert} property.
     *
     * @return the value of the property
     */
    public Date getTmsInsert() {
        return tmsInsert;
    }

    /**
     * Stores the value of the {@link #tmsInsert} property internally.
     *
     * @param tmsInsert the property to be stored
     */
    public void setTmsInsert(Date tmsInsert) {
        this.tmsInsert = tmsInsert;
    }
}
