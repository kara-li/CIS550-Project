{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "import pickle\n",
    "\n",
    "path = \"\" #local path where my csv files were located"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>fdc_id</th>\n",
       "      <th>description</th>\n",
       "      <th>food_category_id</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1105898</td>\n",
       "      <td>Metabolizable Energy of Almonds</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>1105899</td>\n",
       "      <td>Metabolizable Energy of Almonds, Food Processi...</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>1105900</td>\n",
       "      <td>Metabolizable Energy of Cashews</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>1105901</td>\n",
       "      <td>Metabolizable Energy of Pistachios</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>1105902</td>\n",
       "      <td>Metabolizable Energy of Walnuts</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "    fdc_id                                        description  \\\n",
       "0  1105898                    Metabolizable Energy of Almonds   \n",
       "1  1105899  Metabolizable Energy of Almonds, Food Processi...   \n",
       "2  1105900                    Metabolizable Energy of Cashews   \n",
       "3  1105901                 Metabolizable Energy of Pistachios   \n",
       "4  1105902                    Metabolizable Energy of Walnuts   \n",
       "\n",
       "   food_category_id  \n",
       "0               NaN  \n",
       "1               NaN  \n",
       "2               NaN  \n",
       "3               NaN  \n",
       "4               NaN  "
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#basic preprocessing for the food table\n",
    "food = pd.read_csv(path + 'food.csv', error_bad_lines=False)\n",
    "food.drop(['publication_date', 'data_type'], inplace=True, axis=1)\n",
    "food.dropna(subset=['description'], inplace=True)\n",
    "food.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>id</th>\n",
       "      <th>description</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Dairy and Egg Products</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Spices and Herbs</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Baby Foods</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>4</td>\n",
       "      <td>Fats and Oils</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>5</td>\n",
       "      <td>Poultry Products</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   id             description\n",
       "0   1  Dairy and Egg Products\n",
       "1   2        Spices and Herbs\n",
       "2   3              Baby Foods\n",
       "3   4           Fats and Oils\n",
       "4   5        Poultry Products"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#basic preprocessing for the food category table\n",
    "food_category = pd.read_csv(path + 'food_category.csv', error_bad_lines=False)\n",
    "food_category.drop('code', inplace=True, axis =1)\n",
    "food_category.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>raw_ingr</th>\n",
       "      <th>raw_words</th>\n",
       "      <th>processed</th>\n",
       "      <th>replaced</th>\n",
       "      <th>id</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>medium heads bibb or red leaf lettuce, washed,...</td>\n",
       "      <td>13</td>\n",
       "      <td>medium heads bibb or red leaf lettuce, washed,...</td>\n",
       "      <td>lettuce</td>\n",
       "      <td>4308</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>mixed baby lettuces and spring greens</td>\n",
       "      <td>6</td>\n",
       "      <td>mixed baby lettuces and spring green</td>\n",
       "      <td>lettuce</td>\n",
       "      <td>4308</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>romaine lettuce leaf</td>\n",
       "      <td>3</td>\n",
       "      <td>romaine lettuce leaf</td>\n",
       "      <td>lettuce</td>\n",
       "      <td>4308</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>iceberg lettuce leaf</td>\n",
       "      <td>3</td>\n",
       "      <td>iceberg lettuce leaf</td>\n",
       "      <td>lettuce</td>\n",
       "      <td>4308</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>red romaine lettuce</td>\n",
       "      <td>3</td>\n",
       "      <td>red romaine lettuce</td>\n",
       "      <td>lettuce</td>\n",
       "      <td>4308</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                                            raw_ingr  raw_words  \\\n",
       "0  medium heads bibb or red leaf lettuce, washed,...         13   \n",
       "1              mixed baby lettuces and spring greens          6   \n",
       "2                               romaine lettuce leaf          3   \n",
       "3                               iceberg lettuce leaf          3   \n",
       "4                                red romaine lettuce          3   \n",
       "\n",
       "                                           processed replaced    id  \n",
       "0  medium heads bibb or red leaf lettuce, washed,...  lettuce  4308  \n",
       "1               mixed baby lettuces and spring green  lettuce  4308  \n",
       "2                               romaine lettuce leaf  lettuce  4308  \n",
       "3                               iceberg lettuce leaf  lettuce  4308  \n",
       "4                                red romaine lettuce  lettuce  4308  "
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#ingredient table was a .pkl file so opens ingredients and applies basic preprocessing\n",
    "with open(path + 'ingr_map.pkl', 'rb') as pickle_file:\n",
    "    ingredient = pickle.load(pickle_file)\n",
    "ingredient.drop(['len_proc', 'count'], inplace=True, axis = 1)\n",
    "ingredient['processed'] = ingredient['processed'].apply(lambda x: x.split())\n",
    "ingredient['replaced'].value_counts()\n",
    "ingredient.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "4551c07c92e542eabd7b0ef26db1c9de",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=533611.0, style=ProgressStyle(descript…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n"
     ]
    },
    {
     "data": {
      "text/plain": [
       "((0.5, 'WHOLE CLOVE GARLIC'), 'elephant garlic clove')"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#Jaccard Similarity implementation\n",
    "#swifter allows for local parallelization of .apply to make the necessary calculation tenable\n",
    "import swifter\n",
    "\n",
    "def get_jaccard_sim(str1, str2):\n",
    "    str1 = str1.lower()\n",
    "    str2 = str2.lower()\n",
    "    a = set(str1.split()) \n",
    "    b = set(str2.split())\n",
    "    c = a.intersection(b)\n",
    "    return float(len(c)) / (len(a) + len(b) - len(c))\n",
    "\n",
    "v = ingredient['raw_ingr'][4444]\n",
    "def get_max(v):\n",
    "    #gets the 'most similar' via the Jaccard metric defined above\n",
    "    try:\n",
    "        db = food['description'].swifter.progress_bar(True).apply(lambda x: get_jaccard_sim(v,x))\n",
    "        return (db.max(), food['description'][db.idxmax()])\n",
    "    except(TypeError):\n",
    "        return (-1, \"\")\n",
    "(get_max(v), v)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "59cd4270ae9a4b34b041569382ffda19",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=11659.0, style=ProgressStyle(descripti…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n",
      "11659\n",
      "533611\n"
     ]
    }
   ],
   "source": [
    "ingredient['raw_ingr'] = ingredient['raw_ingr'].swifter.apply(str)\n",
    "m = ingredient['raw_ingr']\n",
    "#Applies to dataset (commented out as the result is loaded in via csv and the computation takes many hours)\n",
    "#z = m.swifter.apply(lambda row: get_max(row))\n",
    "#z\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "#loads in the Jaccard computation result instead of recalculating it\n",
    "ing_processed = pd.read_csv(path + 'ing_processed.csv')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "#Food_Nutrient preprocessing and write to csv\n",
    "food_nutrient = pd.read_csv(path + 'food_nutrient.csv', error_bad_lines=False)\n",
    "food_nutrient.drop(['id', 'data_points', 'derivation_id', 'min', 'max', 'median', 'footnote', 'min_year_acquired'], inplace=True, axis = 1)\n",
    "food_nutrient.to_csv('pfood_nutrient.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "metadata": {},
   "outputs": [],
   "source": [
    "#Nutrient preprocessing and write to csv\n",
    "nutrient = pd.read_csv(path + 'nutrient.csv', error_bad_lines=False)\n",
    "nutrient.drop(['nutrient_nbr', 'rank'], inplace = True, axis = 1)\n",
    "nutrient.to_csv('pnutrient.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>name</th>\n",
       "      <th>id</th>\n",
       "      <th>minutes</th>\n",
       "      <th>n_steps</th>\n",
       "      <th>description</th>\n",
       "      <th>n_ingredients</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>arriba   baked winter squash mexican style</td>\n",
       "      <td>137739</td>\n",
       "      <td>55</td>\n",
       "      <td>11</td>\n",
       "      <td>autumn is my favorite time of year to cook! th...</td>\n",
       "      <td>7</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>a bit different  breakfast pizza</td>\n",
       "      <td>31490</td>\n",
       "      <td>30</td>\n",
       "      <td>9</td>\n",
       "      <td>this recipe calls for the crust to be prebaked...</td>\n",
       "      <td>6</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>alouette  potatoes</td>\n",
       "      <td>59389</td>\n",
       "      <td>45</td>\n",
       "      <td>11</td>\n",
       "      <td>this is a super easy, great tasting, make ahea...</td>\n",
       "      <td>11</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>apple a day  milk shake</td>\n",
       "      <td>5289</td>\n",
       "      <td>0</td>\n",
       "      <td>4</td>\n",
       "      <td>NaN</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>aww  marinated olives</td>\n",
       "      <td>25274</td>\n",
       "      <td>15</td>\n",
       "      <td>4</td>\n",
       "      <td>my italian mil was thoroughly impressed by my ...</td>\n",
       "      <td>9</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>...</th>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>178260</th>\n",
       "      <td>zydeco green beans</td>\n",
       "      <td>185979</td>\n",
       "      <td>20</td>\n",
       "      <td>6</td>\n",
       "      <td>haricots verts are very slender french green b...</td>\n",
       "      <td>8</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>178261</th>\n",
       "      <td>zydeco salad</td>\n",
       "      <td>367912</td>\n",
       "      <td>5</td>\n",
       "      <td>4</td>\n",
       "      <td>recipe courtesy of b&amp;c seafood, vacherie, la a...</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>178262</th>\n",
       "      <td>zydeco sauce</td>\n",
       "      <td>357451</td>\n",
       "      <td>15</td>\n",
       "      <td>3</td>\n",
       "      <td>great sauce for cheeseburgers or dipping fries...</td>\n",
       "      <td>6</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>178263</th>\n",
       "      <td>zydeco shrimp wrap</td>\n",
       "      <td>188810</td>\n",
       "      <td>57</td>\n",
       "      <td>14</td>\n",
       "      <td>a wrap inspired by great cajun flavors</td>\n",
       "      <td>11</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>178264</th>\n",
       "      <td>zydeco ya ya deviled eggs</td>\n",
       "      <td>308080</td>\n",
       "      <td>40</td>\n",
       "      <td>7</td>\n",
       "      <td>deviled eggs, cajun-style</td>\n",
       "      <td>8</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>178265 rows × 6 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "                                              name      id  minutes  n_steps  \\\n",
       "0       arriba   baked winter squash mexican style  137739       55       11   \n",
       "1                 a bit different  breakfast pizza   31490       30        9   \n",
       "2                               alouette  potatoes   59389       45       11   \n",
       "3                          apple a day  milk shake    5289        0        4   \n",
       "4                            aww  marinated olives   25274       15        4   \n",
       "...                                            ...     ...      ...      ...   \n",
       "178260                          zydeco green beans  185979       20        6   \n",
       "178261                                zydeco salad  367912        5        4   \n",
       "178262                                zydeco sauce  357451       15        3   \n",
       "178263                          zydeco shrimp wrap  188810       57       14   \n",
       "178264                   zydeco ya ya deviled eggs  308080       40        7   \n",
       "\n",
       "                                              description  n_ingredients  \n",
       "0       autumn is my favorite time of year to cook! th...              7  \n",
       "1       this recipe calls for the crust to be prebaked...              6  \n",
       "2       this is a super easy, great tasting, make ahea...             11  \n",
       "3                                                     NaN              4  \n",
       "4       my italian mil was thoroughly impressed by my ...              9  \n",
       "...                                                   ...            ...  \n",
       "178260  haricots verts are very slender french green b...              8  \n",
       "178261  recipe courtesy of b&c seafood, vacherie, la a...              4  \n",
       "178262  great sauce for cheeseburgers or dipping fries...              6  \n",
       "178263             a wrap inspired by great cajun flavors             11  \n",
       "178264                          deviled eggs, cajun-style              8  \n",
       "\n",
       "[178265 rows x 6 columns]"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#recipe preprocessing (removes special characters that don't play nicely with sql) and write to csv\n",
    "\n",
    "import string\n",
    "\n",
    "def clean(s):\n",
    "    printable = set(string.printable)\n",
    "    s = ''.join(filter(lambda x: x in printable, str(s)))[0:2000]\n",
    "    return \"\".join(s.splitlines())\n",
    "\n",
    "recipes = pd.read_csv(path + 'RAW_recipes.csv')\n",
    "recipesid = pd.read_csv(path + 'PP_recipes.csv')\n",
    "recipes.drop(['contributor_id', 'submitted', 'nutrition'], inplace = True, axis = 1)\n",
    "recipes = recipes.merge(recipesid['id'], on = 'id', how='inner')\n",
    "recipefiltered = recipes.drop(['tags', 'steps', 'ingredients'], axis = 1)\n",
    "recipefiltered['name'] = recipefiltered['name'].apply(clean)\n",
    "recipefiltered['description'] = recipefiltered['description'].apply(clean)\n",
    "recipefiltered.dropna(subset = ['name'], inplace = True)\n",
    "recipefiltered.to_csv('precipes.csv')\n",
    "recipefiltered['description'][120]\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "c8e2bf5aa95e4976aefb337a1eb7ec68",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=178265.0, style=ProgressStyle(descript…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n"
     ]
    }
   ],
   "source": [
    "#steps preprocessing (splits from recipes and creates new table) and write to csv\n",
    "\n",
    "import regex as re\n",
    "string = \"'combine soup , egg and seasoned salt in a bowl and set aside', 'mix together flour , cornstarch , ...'\"\n",
    "def get_tuple(arr):\n",
    "    for i in range(len(arr)):\n",
    "        arr[i] = (arr[i],i)\n",
    "    return arr\n",
    "def makeArray(text):\n",
    "    return [x.replace('[', \"\").replace(\"]\",\"\").replace(\"'\",\"\") for x in text.split(\"', '\")]\n",
    "\n",
    "steps = pd.DataFrame()\n",
    "steps['recipe_id'] = recipes['id']\n",
    "steps['steps'] = recipes['steps'].swifter.apply(makeArray)\n",
    "steps['steps'] = steps['steps'].apply(get_tuple)\n",
    "steps = steps.explode('steps').reset_index(drop = True)\n",
    "steps['step_num'] = steps['steps'].apply(lambda x: x[1])\n",
    "steps['step_description'] = steps['steps'].apply(lambda x: x[0])\n",
    "steps.drop('steps', inplace=True, axis = 1)\n",
    "steps.to_csv('psteps.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 38,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "5646447ad3504dc686dbe2faf65709a7",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=178265.0, style=ProgressStyle(descript…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n"
     ]
    },
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "898bfba0c1d94f1abc2c568c410429e1",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=3182564.0, style=ProgressStyle(descrip…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n"
     ]
    }
   ],
   "source": [
    "import numpy as np\n",
    "#tags preprocessing (splits from recipes and creates new table) and write to csv\n",
    "\n",
    "tags = pd.DataFrame()\n",
    "tags['recipe_id'] = recipes['id']\n",
    "tags['tag'] = recipes['tags'].swifter.apply(makeArray)\n",
    "tags = tags.explode('tag').reset_index(drop = True)\n",
    "tags['tag'] = tags['tag'].swifter.apply(clean)\n",
    "tags['tag'].replace('', np.nan, inplace=True)\n",
    "tags.dropna(inplace = True)\n",
    "tags.to_csv('ptags.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 39,
   "metadata": {},
   "outputs": [],
   "source": [
    "#creation of the Join of ingredients from the two datasets from the jaccard results and save to csv\n",
    "\n",
    "recipe_ingredient_map = pd.DataFrame()\n",
    "recipe_ingredient_map['ingredient_id'] = recipes.merge(recipesid, on = 'id', how='inner')['ingredient_ids']\n",
    "recipe_ingredient_map['recipe_id'] = recipes['id']\n",
    "recipe_ingredient_map['ingredient_id'] = recipe_ingredient_map['ingredient_id'].apply(lambda x: x.replace('[', \"\").replace(\"]\",\"\").replace(\"'\",\"\").split(\", \"))\n",
    "recipe_ingredient_map = recipe_ingredient_map.explode('ingredient_id').reset_index(drop = True)\n",
    "recipe_ingredient_map.drop_duplicates(inplace = True)\n",
    "recipe_ingredient_map.to_csv('recipe_ingredient_map.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 23,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "application/vnd.jupyter.widget-view+json": {
       "model_id": "830b2556971b4deb9ef81d2173cbb50b",
       "version_major": 2,
       "version_minor": 0
      },
      "text/plain": [
       "HBox(children=(FloatProgress(value=0.0, description='Pandas Apply', max=1132367.0, style=ProgressStyle(descrip…"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n"
     ]
    }
   ],
   "source": [
    "import string\n",
    "#saves reviews to csv after removing problematic characters\n",
    "review = pd.read_csv(path + 'RAW_interactions.csv')[['recipe_id', 'rating', 'review', 'date', 'user_id']]\n",
    "review['review'] = review['review'].swifter.apply(clean)\n",
    "review.to_csv('preview.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "metadata": {},
   "outputs": [],
   "source": [
    "#saves food to csv\n",
    "ing_processed = pd.read_csv(path + 'ing_processed.csv')\n",
    "ing_processed['linked'] = ing_processed['linked'].apply(lambda x: x.replace(\"(\", \"\").replace(\")\", \"\").split(\", \"))\n",
    "ing_processed['score'] = ing_processed['linked'].apply(lambda x: float(x[0]))\n",
    "ing_processed['description'] = ing_processed['linked'].apply(lambda x: x[1].replace(\"'\", \"\"))\n",
    "ing_processed.drop('linked', inplace=True, axis= 1)\n",
    "\n",
    "foodtest = ing_processed.sort_values(by=['score']).groupby('replaced').first().reset_index()\n",
    "foodtest = foodtest.sort_values(by=['score'], ascending = True)\n",
    "foodtest = foodtest.merge(food, on = 'description', how = 'left')[['id', 'replaced', 'fdc_id', 'food_category_id']].groupby('id').first().reset_index()\n",
    "foodtest['fdc_id'] = foodtest['fdc_id'].fillna(432811)\n",
    "foodtest.to_csv('pfood.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 31,
   "metadata": {},
   "outputs": [],
   "source": [
    "#saves recipes to csv\n",
    "recipefiltered.rename(columns = {'id': 'recipe_id'}, inplace = True)\n",
    "recipefiltered['avg_rating'] = recipefiltered.merge(review, on='recipe_id')[['recipe_id', 'rating']].groupby('recipe_id').mean()['rating']\n",
    "recipefiltered['num_reviews'] = recipefiltered.merge(review, on='recipe_id')[['recipe_id', 'rating']].groupby('recipe_id').count()['rating']\n",
    "recipefiltered['avg_rating'].fillna(0, inplace = True)\n",
    "recipefiltered['num_reviews'].fillna(0, inplace = True)\n",
    "recipefiltered.to_csv('precipes.csv',encoding='utf-8-sig')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 52,
   "metadata": {},
   "outputs": [],
   "source": [
    "#saves reviews to csv after some preprocessing/removing unecessary columns\n",
    "review.merge(recipefiltered, on = 'recipe_id', how = 'left').dropna()[['recipe_id', 'rating', 'review', 'user_id']].reset_index().to_csv('preview.csv')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.3"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
