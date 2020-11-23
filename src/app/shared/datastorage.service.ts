import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService,) {
        
    }

    storeRecipes(){

        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-angular-fc719.firebaseio.com/recipes.json', recipes)
        .subscribe(response =>{

            console.log(response)

        });

    }

    fetchRecipes(){
        
        return this.http.get<Recipe[]>('https://recipe-angular-fc719.firebaseio.com/recipes.json')
        .pipe(map(recipe =>{
            return recipe.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        tap(recipe =>{
            this.recipeService.setRecipeOver(recipe)
        })
        )

    }




}