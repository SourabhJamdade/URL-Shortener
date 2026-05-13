const sessionIdToUserIdMap = new Map();

function setUser(sessionId, user) {
  sessionIdToUserIdMap.set(sessionId, user); // sessionId is the key and user is the value in the map
}

function getUser(id) {
  return sessionIdToUserIdMap.get(id); // Get the user associated with the given session ID from the map
}

module.exports = { setUser, getUser };
