# Trhknih

## Příprava git repozitáře

```
git clone git@gitlab.fi.muni.cz:xguca/pb138-project.git
cd pb138-project

git checkout -b frontend
git pull origin frontend
git branch --set-upstream-to=origin/frontend

git checkout -b backend
git pull origin backend
git branch --set-upstream-to=origin/backend

git checkout -b dev
git pull origin dev
git branch --set-upstream-to=origin/dev
```

## Práce s repozitářem
#### Příklad postupu pro frontend:
```
git checkout -b frontend
git pull
git checkout -b frontend-login-page                 # vytvoření nové lokální branche
git push set-upstream origin frontend-login-page    # vytvoření nové branche v git repozitáři a spojení s lokální

***práce na souborech lokálně***

git commit .
git push
```
**Ideální by bylo vytvořit vždy issue, co se bude jmenovat stejně, jako nová branch, aby bylo vidět, kdo na tom pracuje**

po `git push` udělejte merge request v gitu, alespoň 1 další člověk to zkontroluje a buď approvne nebo dá do komentáře vědět, co by tam změnil. Po approvnutí dá někdo (ideálně autor kódu) merge (v merge requestu zaškrtněte **Delete source branch**).

## Další informace

Odsazování je 2 mezery.

Z frontend/backend se merguje do dev.

Až bude dokončeno, tak se mergne do main.
