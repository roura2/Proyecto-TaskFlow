import { Component, ViewEncapsulation  } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { User } from 'src/app/tasks/interfaces/User.interface';
import { findIndexById } from '../../helpers/find-index';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UsersPageComponent {
  term: string = '';

  loading: boolean = true;
  submitted!: boolean;
  userDialog!: boolean;

  // ? Obtenir els torneijos amb el 'BehaviorSubject', i amb observables, d'aquesta manera nomes renderitzes la taula quan hi han dades
  // private tournamentsSubject: BehaviorSubject<Tournament[]> = new BehaviorSubject<Tournament[]>([]);
  // public readonly tournaments$: Observable<Tournament[]> = this.tournamentsSubject.asObservable();
  user!: User;
  users!: User[];
  selectedUsers!: User[];
  usersSuggested!: User[];

  userDB!: User;

  tournamentType: boolean = false;

  formNewUser!: FormGroup;

  isUnofficial: boolean = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.formNewUser = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [{ value: '', disabled: this.isUnofficial }, [Validators.required]],
      address: [null, [Validators.required]],
      tel: [null, [Validators.required]]
    });

    this.getAllUsers();
  }

  openDialog() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
    this.formNewUser.reset();
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  // getClassCSS(campo: string): string {
  //   return (this.loginUser.get(campo)?.invalid && this.loginUser.get(campo)?.touched)
  //     ? "form-control is-invalid"
  //     : "form-control";
  // }

  getAllUsers() {
    this.usersService.getUsers()
      .subscribe((users) => {
        this.loading = false;

        this.users = users;
      })
  }

  saveUser() {
    this.submitted = true;

    const name = this.formNewUser.value.name;
    const lastname = this.formNewUser.value.lastname;
    const email = this.formNewUser.value.email;
    const address = this.formNewUser.value.address;
    const tel = this.formNewUser.value.tel;

    // console.log(name, description, game, price, type, image);

    this.userDB = {
      name,
      lastname,
      email,
      address,
      tel
    }

    console.log(this.user);

    if (this.user.name?.trim()) {
      if (this.user.id) {
        // TODO: Treure els ngModels i posar els valors dels camps aqui
        console.log('Id tournament: ', this.user.id, 'Tournament in the Form: ', this.userDB);

        this.userDB = { ...this.user };

        this.usersService.updateUser(this.user.id, this.userDB)
          .subscribe(resp => {
            console.log(resp);
          });

        this.users[findIndexById(this.users, this.user.id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
      } else {

        this.usersService.createUser(this.userDB)
          .subscribe((user) => {
            console.log(user);
          });

        this.user = { ...this.userDB };
        this.users.push(this.user);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
      }
    }

    this.users = [...this.users];
    this.userDialog = false;
    this.user = {};
    this.getAllUsers();
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usersService.deleteUser(user.id!).subscribe(console.log);

        this.users = this.users.filter(val => val.id !== user.id);
        this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

  searchUser() {

    if (this.term === '') {
      this.getAllUsers();
    }

    this.usersService.getSuggestionsUsers(this.term)
      .subscribe(users => this.users = users);
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected tournaments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedUsers.forEach(({ id }) => {
          this.usersService.deleteUser(id!)
            .subscribe(console.log);
        });

        this.users = this.users.filter(user => !this.selectedUsers.includes(user));
        this.selectedUsers = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

}
