import { SQLite } from 'expo';

const db = SQLite.openDatabase({ name: 'weeklyplans.db' });

export const createTable = () => {
	db.transaction(tx => {
		tx.executeSql(
			`create table if not exists weeklyplans 
			(id integer primary key not null,
			 date text,
			 name text, 
			 completed int);`
		);
	});
};

export const givePlansOnGivenDate = (dates, callback) => {
	db.transaction(
		tx => {			
			tx.executeSql(`
				select * from weeklyplans where date = ? OR date = ? OR date = ?
				OR date = ? OR date = ? OR date = ? OR date = ?
			`, dates, (_, { rows }) => {
				callback(rows);
			});
		},
		null,
		null
	);
};

export const addPlan = (date, name) => {
	db.transaction(
		tx => {			
			tx.executeSql('insert into weeklyplans (date, name, completed) values (?, ?, 0)', 
										[date, name]);
		},
		null,
		null
	);
};

export const toggleCompleted = (id, completed) => {
	db.transaction(
		tx => tx.executeSql('update weeklyplans set completed = ? where id = ?;', [completed, id]),
		null,
		null
	);
};
          
export const deletePlan = id => {
	db.transaction(
		tx => {
			tx.executeSql('delete from weeklyplans where id = ?;', [id]);
		},
		null,
		null
	);
};

export const editPlan = (id, name) => {
	db.transaction(
		tx => tx.executeSql('update weeklyplans set name = ? where id = ?;', [name, id]),
		null,
		null
	);
};
