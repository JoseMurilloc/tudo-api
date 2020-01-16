const InvalidAcessException = use('App/Exceptions/InvalidAcessException')
const ResourceNotExistException = use ('App/Exceptions/ResourceNotExistException');

class AuthorizationService {
  verifyPermission(resource, user) {

    if(!resource)
      throw new ResourceNotExistException();

    if (resource.user_id !== user.id) 
      throw new InvalidAcessException();
    
  }
}

module.exports = new AuthorizationService();