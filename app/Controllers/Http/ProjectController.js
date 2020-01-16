'use strict'

const Project = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService')

class ProjectController {
  
  // INDEX users
  async index ({ auth }) {
    const user = await auth.getUser();
    return user.projects().fetch(); 
  }

  // CREATE users
  async create ({ auth, request}) {
    const user = await auth.getUser();
    const { title } = request.all();
    
    const project = await Project.create({
      title,
      user_id: user.id,
    });
    
    return project;
  }
  
  // DESTROY users
  async destroy ({ auth, resquest, params, response }) {
    const user = await auth.getUser();
    const { id } = params;
    
    const project = await Project.find(id);
  
    AuthorizationService.verifyPermission(project, user);

    await project.delete();
    return project;
  }

  // UPDATE users
  async update ({ auth, request, params }) {
    
    const user = await auth.getUser();
    const { id } = params;

    const project = await Project.find(id);
  
    AuthorizationService.verifyPermission(project, user);

    project.merge(request.only('title'));
    await project.save();

    return project;
  }
}

module.exports = ProjectController
