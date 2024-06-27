import { FALLOUTZERO } from '../config.mjs'

export default class FalloutZeroActor extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields
    const requiredInteger = { required: true, nullable: false, integer: true }
    const schema = {}
    schema.biography = new fields.HTMLField()
    schema.skillPool = new fields.NumberField({ initial: 0 })
    schema.startingSkillpoints = new fields.NumberField({ initial: 6 })
    schema.totalSkillpoints = new fields.NumberField({ initial: 0 })
    schema.health = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
      }),
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
      }),
    })
    schema.stamina = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        min: 0,
        initial: 10,
      }),
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
      }),
    })
    schema.actionPoints = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
      }),
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
      max: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
      }),
    })
    schema.karmaCaps = new fields.ArrayField(new fields.BooleanField(), { initial: [true] })

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(
      Object.keys(FALLOUTZERO.abilities).reduce((obj, ability) => {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 5,
          }),
          mod: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          modifiers: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: FALLOUTZERO.abilities[ability].label,
          }),
          abbr: new fields.StringField({
            initial: FALLOUTZERO.abilities[ability].abbreviation,
          }),
        })
        return obj
      }, {}),
    )

    schema.skills = new fields.SchemaField(
      Object.keys(FALLOUTZERO.skills).reduce((obj, skill) => {
        obj[skill] = new fields.SchemaField({
          ability: new fields.ArrayField(new fields.StringField({ required: true })),
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          modifiers: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
          }),
          label: new fields.StringField({
            initial: FALLOUTZERO.skills[skill].label,
          }),
          id: new fields.StringField({
            initial: FALLOUTZERO.skills[skill].id,
          }),
        })
        return obj
      }, {}),
    )

    schema.materials = new fields.SchemaField(
      Object.keys(FALLOUTZERO.materials).reduce((obj, material) => {
        obj[material] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
          label: new fields.StringField({
            initial: FALLOUTZERO.materials[material].label,
          }),
          id: new fields.StringField({
            initial: FALLOUTZERO.materials[material].id,
          }),
        })
        return obj
      }, {}),
    )

    schema.armorClass = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
    })

    schema.damageThreshold = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
      min: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
      }),
    })

    schema.caps = new fields.NumberField({
      initial: 0,
      min: 0,
    })

    return schema
  }
}
