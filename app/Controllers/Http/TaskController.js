'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthorizationService = use('App/Services/AuthorizationService')

class TaskController {


  // INDEX task
  async index({ auth, request, params }) {
    const user = await auth.getUser(); // Busca o token do ususario logado
    const { id } = params;

    const project = await  Project.find(id);

    // Confirma se o id do usuario logado e igual ao id do projeto buscado pelo id do params
    AuthorizationService.verifyPermission(project, user);

    // Retornando todas as tasks que o project referente ao id params nos permite
    return project.tasks().fetch();

  }


  //CREATE task
  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const { description } = request.all();
    const { id } = params;

    // Get project the id params
    const project = await Project.find(id);

    AuthorizationService.verifyPermission(project, user);

    const task = await Task.create({
      description,
      project_id: project.id,
    });

    // const task = new Task().fill({
    //   description,
    //   project_id: project.id,
    // });

    // await project.tasks().save(task);

    return task;

  }

  // UPDATE tasks
  async update ({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;

    const task = await Task.find(id);
    const project = await task.project().fetch();

    AuthorizationService.verifyPermission(project, user);
    await task.delete();

    return task;
  }

  // DESTROY tasks
  async destroy ({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;

    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthorizationService.verifyPermission(project, user);

    task.merge(request.only([
      'description',
      'completed',
    ]));

    await task.save();
    return task;

  }
}

module.exports = TaskController
