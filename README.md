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
git checkout -b frontend-login-page                   # vytvoření nové lokální branche
git push --set-upstream origin frontend-login-page    # vytvoření nové branche v git repozitáři a spojení s lokální

***práce na souborech lokálně***

git commit .
git push
```
**Ideální by bylo vytvořit vždy issue, co se bude jmenovat stejně, jako nová branch, aby bylo vidět, kdo na tom pracuje**
**Ideální by bylo vytvořit vždy issue s jednoduchým popisem, co se má udělat, a přímo z issue vytvořit branch (případně rovnou i merge request) s tím, že se musí vždy zadat source branch (frontend/backend) a název branche (ideálně stejný jako název issue)**
**jako assignee na issue se vždy nastavý ten, kdo na tom chce dělat**

až bude issue hotové, vytvořte merge request (pokud ještě není) a nastavte alespoň 1 dalšího člověka jako reviewer ten to zkontroluje a buď approvne nebo dá do komentáře vědět, co by tam změnil. Po approvnutí dá někdo (ideálně autor kódu) merge (v merge requestu zaškrtněte **Delete source branch**).

## Další informace

Odsazování je 2 mezery.

Z frontend/backend se merguje do dev.

Až bude dokončeno, tak se mergne do main.
