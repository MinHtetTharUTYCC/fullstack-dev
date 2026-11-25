/**
 * User class
 */
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /**
     * Create a new User instance
     * @param {string} name - The user's name
     * @returns {User} A new User instance
     */
    static create(name) {
        const id = String(Date.now()); // simple unique id based on timestampp
        return new User(id, name);
    }

    /**
     * Convert the User instance to a JSON object
     * @returns {Object} A JSON representation of the User instance
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }

    /**
     * Create a User instance from a JSON object
     * @param {Object} json - A JSON object representing a User
     * @returns {User} A new User instance
     */
    static fromJSON(json) {
        return new User(json.id, json.name);
    }
}

export { User };
